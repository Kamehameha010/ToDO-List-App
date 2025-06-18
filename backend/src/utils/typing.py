from typing import NamedTuple


class Result(NamedTuple):
    data: dict | None
    is_success: bool
    error: str | dict | None
