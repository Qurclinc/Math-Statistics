from fastapi import APIRouter, UploadFile, Form, File, HTTPException, Depends

import filetype
from core import parser
from schemas import SetupParser

router = APIRouter()

@router.get("/parse")
async def parse():
    try:
        parser.parse_data()
        return {
            "signs": parser.signs,
            "header": parser.header,
            "data": parser.data
        }
    except:
        raise HTTPException(400, "Загрузите файл!")
    
def read_conf(
    skip_cols: int = Form(...),
    sign_col: int = Form(...)
):
    return SetupParser(skip_cols=skip_cols, sign_col=sign_col)

@router.post("/load")
async def upload(
    parser_conf: SetupParser = Depends(read_conf),
    xlsx_file: UploadFile = File(...)
):
    content = await xlsx_file.read()
    kind = filetype.guess(content)
    if kind.extension != "xlsx":
        raise HTTPException(400, "Некорректное расширение файла")
    parser.workbook = xlsx_file.file
    parser.sign_col = parser_conf.sign_col
    parser.skip_cols = parser_conf.skip_cols
    return True