export const updateTimestamp = (schema) => {
  schema.pre("save", function (next) {
    if (this.isNew) {
      const now = new Date();
      this.createdAt = now;
      this.updatedAt = now;
    } else {
      if (this.isModified()) {
        this.updatedAt = new Date();
      }
    }
    next();
  });

  schema.pre("findOneAndUpdate", function (next) {
    if (!this._update.$set || !this._update.$set.updatedAt) {
      this.set({ updatedAt: new Date() });
    }
    next();
  });
};
