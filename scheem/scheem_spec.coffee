# Test the Scheem Parser.
PEG = require('pegjs')
assert = require('assert')
fs = require('fs')

# Read in the Scheem PEG.
data = fs.readFileSync('scheem.peg', 'utf-8')
# console.log data

# Build the parser.
parse = PEG.buildParser(data).parse

# Begin test suite.
assert.ok( true )

