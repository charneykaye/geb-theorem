[![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

Experiments pertaining to Godel-Escher-Bach "Can you produce MU?" example.

Author: [Nick C. Kaye](http://www.nickkaye.com)

## Documentation

### TheoremSeeker

Utilizes a TheoremProducer to perform maths and seek new Theorem.

    @property {number} total_iterations
    @property {number} max_content_length
    @property {Array|String} start_with_axiom
    @property {string} search_for_content:
    
Configure, Run, Report:

    var seeker = new TheoremSeeker({...});
    seeker.run();
    seeker.report();

### TheoremProducer

Produces Theorem, storing all of them in a set.

    @property {TheoremSet} _set

### TheoremSet

Stores many Theorem, referenced by their _id.

    @property {Object} contents

### TheoremRule

Rule of production of one Theorem from another.

    @property {Function} produce()
    @property {Function} each_variant()

### Theorem

One Theorem- a mutation of an axiom or another theorem.

    @property {number} _id
    @property {number} _level
    @property {String} content
    @property {number} rule_name
    @property {number} rule_variant

### Basic Usage

TODO: Write This
   
## License

HTTP Model-as-a-Service is freely distributable under the terms of the [MIT license](LICENSE).

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[travis-url]: http://travis-ci.org/nickckaye/geb-theorem
[travis-image]: http://img.shields.io/travis/nickckaye/geb-theorem/master.svg?style=flat
