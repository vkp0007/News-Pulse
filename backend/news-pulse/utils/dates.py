from dateutil.parser import parse


def parse_date(date_string):
    """
    Convert RSS date string to datetime.
    """

    if not date_string:
        return None

    try:
        return parse(date_string)
    except Exception:
        return None