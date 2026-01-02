import re


class RGparse:
    """
    Responsável por interpretar o texto retornado pelo OCR
    e extrair campos relevantes de um RG brasileiro.
    """

    def __init__(self, ocr_text: str):

        self.raw_text = ocr_text
        self.text = (
            ocr_text.upper()
            .replace("\n", " ")
            .replace("\r", " ")
        )

  
        while "  " in self.text:
            self.text = self.text.replace("  ", " ")

   
        print("___________________________________________________________________________________________________________ \n")
        print(self.text)
        print("___________________________________________________________________________________________________________ \n")

    def extrair_nome(self):
        match = re.search(
            r"NOME\s+([A-ZÀ-Ú\s]+)",
            self.text
        )

        if not match:
            print("[DEBUG] Nome não encontrado")
            return None

        nome = match.group(1).strip()
  
        return nome

    def extrair_rg(self):
        match = re.search(
            r"\b\d{1,2}\.\d{3}\.\d{3}-\d{1,2}\b",
            self.text
        )

        if not match:
            print("[DEBUG] RG não encontrado")
            return None

        rg = match.group(0)
       
        return rg

    def extrair_cpf(self):
        match = re.search(
            r"\b\d{9}/\d{1,2}\b",
            self.text
        )

        if not match:
            print("[DEBUG] CPF não encontrado")
            return None

        cpf = match.group(0)
     
        return cpf

    def extrair_nascimento(self):
        match = re.search(
            r"\d{2}/\d{2}/\d{4}",
            self.text
        )

        if not match:
            print("[DEBUG] Data de nascimento não encontrada")
            return None

        nascimento = match.group(0)
        
        return nascimento

    def parse(self):
        """
        Executa todas as extrações e retorna um dicionário
        com os dados encontrados.
        """

        dados = {
            "nome": self.extrair_nome(),
            "rg": self.extrair_rg(),
            "cpf": self.extrair_cpf(),
            "data_nascimento": self.extrair_nascimento(),
        }

   
        print(dados)
        

        return dados
