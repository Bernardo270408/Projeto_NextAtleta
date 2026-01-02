from extension.extensao import db
from sqlalchemy import Enum
from sqlalchemy.sql import func


class ExperienciaEsportiva(db.Model):
    __tablename__ = 'experiencia_esportiva'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)

    perfil_atleta_id = db.Column(
        db.BigInteger,
        db.ForeignKey('perfil_atleta.id', ondelete='CASCADE', onupdate='CASCADE'),
        nullable=False
    )

    tipo_experiencia = db.Column(
        Enum('clube', 'escolinha', 'competicao', name='tipo_experiencia_enum'),
        nullable=False
    )

    nome_entidade = db.Column(db.String(150), nullable=False)
    cargo_funcao = db.Column(db.String(100))

    data_inicio = db.Column(db.Date)
    data_fim = db.Column(db.Date)
    em_andamento = db.Column(db.Boolean, default=False)

    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(2))

    descricao = db.Column(db.Text)

    ordem_exibicao = db.Column(db.SmallInteger, default=0)
    verificada = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime)

    perfil_atleta = db.relationship('PerfilAtleta', back_populates='experiencias')

    def to_dict(self):
        return {
            "id": self.id,
            "tipo_experiencia": self.tipo_experiencia,
            "nome_entidade": self.nome_entidade,
            "cargo_funcao": self.cargo_funcao,
            "data_inicio": self.data_inicio.isoformat() if self.data_inicio else None,
            "data_fim": self.data_fim.isoformat() if self.data_fim else None,
            "em_andamento": self.em_andamento,
            "cidade": self.cidade,
            "estado": self.estado,
            "descricao": self.descricao,
            "verificada": self.verificada
        }
