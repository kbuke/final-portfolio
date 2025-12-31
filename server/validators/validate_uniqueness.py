def validate_uniqueness(value, self, model, attribute, field_name="Value"):
    # 1 - Check value exists in model
    column = getattr(model, attribute)

    existing_value = model.query.filter(column == value).first()
    
    if existing_value and existing_value.id != self.id:
        raise ValueError(f"{field_name} already has {value} registered under {attribute}")
    return value