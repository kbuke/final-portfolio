def validate_count(model, self, noOfInstance, instance, value):
    count = model.query.count()
    if self.id is None and count >= noOfInstance:
        raise ValueError(f"Can not have more than {noOfInstance} {instance}s")
    return value