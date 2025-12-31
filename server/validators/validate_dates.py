from datetime import date, datetime

def validate_dates(value, key):
    if key == "start_date" and value is None:
        raise ValueError("Must enter start date")
    
    if not isinstance(value, date):
        try:
            value = datetime.strptime(value, "%Y-%m-%d").date()
        except ValueError:
            raise ValueError("Must enter a valid date")
    
    return value
