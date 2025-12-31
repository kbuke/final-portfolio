def validate_string(value, field_name="Value"):
    # 1 - Reject Booleans and None
    if isinstance(value, bool) or value is None:
        raise ValueError(f"{field_name} must be a valid string")
    
    # 2 - Convert string if needed
    if not isinstance(value, str):
        try:
            value = str(value)
        except Exception:
            raise ValueError(f"{field_name} must be a string")
    
    # 3 - Strip and check if emoty
    value = value.strip()
    if value == "":
        raise ValueError(f"{field_name} cannot be empty string")
    
    return value