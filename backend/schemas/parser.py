from pydantic import BaseModel

class SetupParser(BaseModel):
    skip_cols: int | None = None
    sign_col: int | None = None