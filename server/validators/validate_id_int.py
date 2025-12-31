def validate_id_int(value, field_name):
    try:
        return int(value)
    except Exception:
        raise ValueError(f"{field_name} must be a valid integer")