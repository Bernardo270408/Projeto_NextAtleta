import pytesseract

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Users\jvtol\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"
)

# Receber uma imagem já tratada e extrair texto confiável via OCR.
class OCRservices:

    @staticmethod
    def extracao_text(img):
        try:
            
            texto = pytesseract.image_to_string(
                        img,
                        lang="por",
                        config="--psm 6"
                    )

            if not texto.strip():
                raise ValueError("Não foi possivel encontrar um texto na imagem")
            
            return texto
        except Exception as e:
            raise RuntimeError(f"Erro ao executar o OCR : {e}")