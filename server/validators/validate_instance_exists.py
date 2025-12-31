def validate_instance_exists(model, value, label):
    exists = model.query.get(value)
    if not exists:
        raise ValueError(f"{label} {value} does not exist")
    return value