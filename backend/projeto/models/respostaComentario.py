from extension.extensao import db
from sqlalchemy.sql import func

class RespostaComentario(db.Model):
    """
    Representa uma resposta feita por um usuário a um comentário.

    Cada resposta pertence a um único comentário e a um único usuário.
    Essa tabela permite encadeamento de discussões dentro de uma postagem.
    """

    __tablename__ = 'resposta_comentario'

    # Identificador único da resposta
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)

    # Conteúdo textual da resposta
    conteudo = db.Column(
        db.Text,
        nullable=False,
        comment="Texto da resposta ao comentário."
    )

    # Comentário ao qual a resposta pertence
    comentario_id = db.Column(
        db.BigInteger,
        db.ForeignKey('comentario_postagem.id', ondelete='CASCADE', onupdate='CASCADE'),
        nullable=False,
        comment="ID do comentário respondido."
    )

    # Usuário que criou a resposta
    usuario_id = db.Column(
        db.BigInteger,
        db.ForeignKey('usuario.id', ondelete='CASCADE', onupdate='CASCADE'),
        nullable=False,
        comment="ID do usuário autor da resposta."
    )

    # Indica se a resposta está ativa ou foi removida logicamente
    ativo = db.Column(
        db.Boolean,
        default=True,
        comment="Soft delete da resposta."
    )

    # Data e hora em que a resposta foi criada
    created_at = db.Column(
        db.DateTime,
        server_default=func.now(),
        comment="Data e hora da criação da resposta."
    )

    # Data e hora da última atualização da resposta
    updated_at = db.Column(
        db.DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    # Relacionamento com o comentário
    comentario = db.relationship('ComentarioPostagem', backref='respostas')

    # Relacionamento com o usuário
    usuario = db.relationship('Usuario', backref='respostas')

    # Relacionamento com curtidas
    curtidas = db.relationship('Curtida', backref='resposta')

    def to_dict(self):
        """
        Converte o objeto RespostaComentario em um dicionário Python.

        Essa conversão facilita o envio dos dados para o frontend,
        especialmente em respostas de APIs no formato JSON.
        """
        return {
            "id": self.id,
            "conteudo": self.conteudo,
            "comentario_id": self.comentario_id,
            "usuario_id": self.usuario_id,
            "ativo": self.ativo,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "nome_usuario": self.usuario.nome if self.usuario else None,
            "foto_usuario": self.usuario.foto_perfil if self.usuario else None
        }