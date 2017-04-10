function Link (opts) {
   if (!(this instanceof Link)) return new Link(opts);
   if (!opts.origin) throw new Error('Argument `origin` is required');
   if (!opts.destination) throw new Error('Argument `destination` is required');
   if (!opts.description) throw new Error('Argument `description` is required');
   if (typeof opts.origin !== 'string') throw new Error('Argument `origin` should be a string');
   if (typeof opts.destination !== 'string') throw new Error('Argument `destination` should be a string');
   if (typeof opts.description !== 'string') throw new Error('Argument `description` should be a string');
   if (opts.origin === opts.destination) throw new Error('Arguments `origin` and `destination` should not be equal');
   
   this.options = {}; 
   this.options.origin = opts.origin;
   this.options.destination = opts.destination;
   this.options.description = opts.description; 
}

Link.prototype.asObject = function () {
    return this.options;
}

module.exports = Link;
