describe 'The SCHEEM parser!', ->
	
	beforeEach -> 
		PEG = require 'pegjs'
		fs = require 'fs'
		data = fs.readFileSync('scheem.peg', 'utf-8')
		wrapException = (f) ->
			return (x) ->				
				try
					return f(x)
				catch err
					return undefined
		@parser = wrapException(PEG.buildParser(data).parse)
	
	describe 'Expressions containing single atoms', -> 
	
		it 'parses a single atom', ->
			expect(@parser('atom')).toEqual 'atom'
			
		it 'parses more diverse atoms', ->
			expect(@parser('123lunchroom')).toEqual '123lunchroom'
			
		it 'fails to parse (illegal) space characters', ->
			expect(@parser(' ') ).toEqual undefined
			
		it 'also fails to parse parentheses', ->
			expect(@parser('(')).toEqual undefined
			
	describe 'expressions containing atoms ', ->
		
		it 'parses (dog cat)', ->
			result = @parser('(dog cat)')
			expect(result).toEqual (['dog', 'cat'])
			
		it 'parses (+ 1 (f x 3 y))', ->
			result = @parser('(+ 1 (f x 3 y))')
			expect(result).toEqual ["+", "1", ["f", "x", "3", "y"]]
			
			
			
			
			
			
			
			