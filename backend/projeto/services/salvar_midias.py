import cloudinary.uploader
import os
from werkzeug.utils import secure_filename
from cloudinary.exceptions import Error as CloudinaryError

class SalvarMidias:

    EXTENSOES = ['.jpg', '.jpeg', '.png', '.webp']
    

    @staticmethod
    def salvar_foto_perfil(foto, nome, id_usuario):
        try:
            if foto is None:
                return "https://res.cloudinary.com/dcdfpnnyp/image/upload/v1767199086/default_wg0mlz.png"
            nome_ajustado = secure_filename(nome.lower().replace(" ", "_"))
            extensao = os.path.splitext(foto.filename)[1]

            if extensao not in SalvarMidias.EXTENSOES:
                raise ValueError("Extensão não suportada")
            
            nome_arquivo = f"perfil_{nome_ajustado}{id_usuario}"
            result = cloudinary.uploader.upload(
                foto, 
                public_id = nome_arquivo,
                overwrite = True,
                resource_type="image",
                transformation=[
                    {"width": 400, "height": 400, "crop": "fill"},
                    {"quality": "auto"}
                    ]
                )

            return result.get('secure_url')
        
        except CloudinaryError as e:
            # Erro externo conhecido
            raise RuntimeError(f"Erro ao salvar imagem no serviço de mídia: {str(e)}")

        except Exception as e:
            # Erro inesperado
            raise RuntimeError("Erro interno ao processar a imagem.")