
class FormadorMensagem():

    @staticmethod
    def formar_texto_cadastro_agente(status):
        if status == 'pendente':
            return "Não foi possível confirmar sua identidade no momento. Seu cadastro foi realizado com sucesso no sistema, porém sua conta terá algumas limitações. Para obter um perfil totalmente verificado e acesso completo às funcionalidades, será necessário o envio de um documento válido para nova análise em breve"