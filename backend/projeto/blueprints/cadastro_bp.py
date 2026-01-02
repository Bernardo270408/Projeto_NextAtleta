from flask import jsonify, request, Blueprint
from controller.cadastroController import CadastroController
from services.preProcessador_img import Preprocessador_img
from services.ocrService import OCRservices
from services.rg_parser import RGparse
from services.tratamento_dados import Tratamento_dados


cadastro_bp = Blueprint("cadastro", __name__)
controller = CadastroController()


@cadastro_bp.route('/', methods=['POST'])
def cadastrar_atleta ():
    data = request.form.to_dict()
    if not data: 
        print("JSON inválido ou ausente")
        return jsonify({"error": "JSON inválido ou ausente"}), 400

    try:
        arquivos = request.files
        arquivo_unico = arquivos.get('arquivo_documento_unico')
        if arquivo_unico:
            info = Tratamento_dados.extrair_dados(arquivo_unico)
            data.update({
                'data_nascimento_documento': info.get('data_nascimento'),
                'nome_documento': info.get('nome'),
                'rg_documento': info.get('rg'),
                'cpf_documento': info.get('cpf'),
            })

        else:
            frente = arquivos.get('arquivo_documento_frente')
            verso = arquivos.get('arquivo_documento_verso')

            if not frente or not verso:
                return jsonify({"error": "Envie frente e verso do documento"}), 400
            
            info_frente = Tratamento_dados.extrair_dados(frente)
            info_verso = Tratamento_dados.extrair_dados(verso)

            data.update({
                'data_nascimento_documento': info_frente.get('data_nascimento'),
                'nome_documento': info_frente.get('nome'),
                'rg_documento': info_verso.get('rg'),
                'cpf_documento': info_verso.get('cpf'),
            })

        print("\n_________________________DADOS____________________________\n")
        print(data)
        print("\n__________________________________________________________\n")

        if not Tratamento_dados.validar_cpf(data['cpf_documento']):
            return jsonify({
                "sucess": False,
                "message": "CPF invalido!"
            }), 500
        
        usuario = controller.cadastrar_usuario_com_atleta(data)

        return jsonify({
            "sucess": True,
            "user": usuario.to_dict()
        }), 500

    except ValueError as e:
        print(str(e))
        return jsonify({
            "sucesso": False,
            "erro": str(e)
        }), 400
    
    except Exception as e:
        print(str(e))
        return jsonify({
            "success": False,
            "error": "Erro interno no servidor"
        }), 500

@cadastro_bp.route('/agente', methods=['POST'])
def cadastro_agente():
    try: 
        dados = request.form.to_dict()
        arquivos = request.files
        print("dados: ",dados, "\n")

        foto_perfil = arquivos.get('foto_perfil')
        logo = arquivos.get('logo')
        documento = arquivos.get('arquivo_documento')

        dados['foto_perfil'] = foto_perfil
        dados['logo'] = logo
        dados['documento'] = documento

        resultado = Tratamento_dados.extrair_dados(documento)

        usuario = controller.cadastro_usuario_com_agente(dados, resultado['cpf'])
        
        return jsonify(usuario), 200

        
    except ValueError as e:
        print(str(e))
        return jsonify({
            "sucesso": False,
            "erro": str(e)
        }), 400
    
    except Exception as e:
        print(e)
        return jsonify({
            "success": False,
            "error": "Erro interno no servidor"
        }), 500


