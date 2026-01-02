from extension.extensao import db
from sqlalchemy import Enum
from sqlalchemy.sql import func


class PerfilEsportivo(db.Model):
    __tablename__ = 'perfil_esportivo'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)

    usuario_id = db.Column(
        db.BigInteger,
        db.ForeignKey('usuario.id', ondelete='CASCADE'),
        nullable=False
    )

    tipo_perfil = db.Column(
        Enum('empresario', 'agente', 'clube', 'escolinha', name='tipo_perfil_enum'),
        nullable=False
    )

    nome_publico = db.Column(db.String(150), nullable=False)
    descricao = db.Column(db.Text)

    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(2))

    site = db.Column(db.String(255))
    telefone = db.Column(db.String(20))
    email_contato = db.Column(db.String(150))

    logo = db.Column(db.String(255))

    documento_tipo = db.Column(
        Enum('CPF', 'CNPJ', name='documento_tipo_enum')
    )
    documento_numero = db.Column(db.String(30))
    documento_validado = db.Column(db.Boolean, default=False)

    data_validacao = db.Column(db.DateTime)

    verificado = db.Column(db.Boolean, default=False)
    verificacao_nivel = db.Column(
        Enum('basica', 'automatica', 'manual', 'completa', name='verificacao_nivel_enum'), default = 'basica'
    )
    fonte_verificacao = db.Column(
        Enum('ocr', 'automatica', 'humana', name='fonte_verificacao_enum'), default = 'ocr'
    )

    status_verificacao = db.Column(
        Enum('pendente', 'aprovado', 'rejeitado', name='status_verificacao_enum'),
        default='pendente'
    )

    motivo_rejeicao = db.Column(db.Text)

    verificado_por = db.Column(db.String(30))
    verificado_em = db.Column(db.DateTime)

    verificado_quando = db.Column(
        db.DateTime,
        nullable=False,
        server_default=func.now()
    )

    usuario = db.relationship('Usuario', backref='perfil_esportivo')

    def to_dict(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "tipo_perfil": self.tipo_perfil,
            "nome_publico": self.nome_publico,
            "descricao": self.descricao,
            "cidade": self.cidade,
            "estado": self.estado,
            "site": self.site,
            "telefone": self.telefone,
            "email_contato": self.email_contato,
            "logo": self.logo,
            "verificado": self.verificado,
            "status_verificacao": self.status_verificacao
        }
