from extension.extensao import db
from sqlalchemy.sql import func
from sqlalchemy import Enum


class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)

    nome = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    senha_hash = db.Column(db.String(255), nullable=False)

    tipo_usuario = db.Column(
        Enum('atleta', 'admin', 'empresario', 'agente', 'clube', 'escolinha', name='tipo_usuario_enum'),
        nullable=False,
        default='atleta'
    )

    status = db.Column(
        Enum('ativo', 'inativo', 'bloqueado', name='status_usuario_enum'),
        nullable=False,
        default='ativo'
    )

    email_verificado = db.Column(db.Boolean, nullable=False, default=False)

    telefone = db.Column(db.String(20))
    foto_perfil = db.Column(db.String(255))

    ultimo_login = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=func.now()
    )

    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=func.now(),
        onupdate=func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "tipo_usuario": self.tipo_usuario,
            "status": self.status,
            "email_verificado": self.email_verificado,
            "telefone": self.telefone,
            "foto_perfil": self.foto_perfil,
            "ultimo_login": self.ultimo_login.isoformat() if self.ultimo_login else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
