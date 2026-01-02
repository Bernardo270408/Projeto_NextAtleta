from extension.extensao import db
from sqlalchemy import Enum
from sqlalchemy.sql import func


class ConquistaAtleta(db.Model):
    __tablename__ = 'conquista_atleta'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)

    perfil_atleta_id = db.Column(
        db.BigInteger,
        db.ForeignKey('perfil_atleta.id', ondelete='CASCADE', onupdate='CASCADE'),
        nullable=False
    )

    tipo = db.Column(
        Enum(
            'titulo',
            'premiacao_individual',
            'convocacao',
            'destaque',
            'recorde',
            name='tipo_conquista_enum'
        ),
        nullable=False
    )

    titulo = db.Column(db.String(150), nullable=False)
    competicao = db.Column(db.String(150))
    ano = db.Column(db.Integer)

    clube_representado = db.Column(db.String(150))

    nivel = db.Column(
        Enum('municipal', 'estadual', 'nacional', 'internacional', name='nivel_conquista_enum')
    )

    descricao = db.Column(db.Text)

    verificada = db.Column(db.Boolean, default=False)
    fonte_verificacao = db.Column(db.String(255))
    ordem_exibicao = db.Column(db.SmallInteger, default=0)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime)

    perfil_atleta = db.relationship('PerfilAtleta', back_populates='conquistas')

    def to_dict(self):
        return {
            "id": self.id,
            "tipo": self.tipo,
            "titulo": self.titulo,
            "competicao": self.competicao,
            "ano": self.ano,
            "nivel": self.nivel,
            "verificada": self.verificada
        }
