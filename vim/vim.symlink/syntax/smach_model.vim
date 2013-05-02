" Vim syntax file
" Language: SMACH Xtext model
" Maintainer: Alexander Bubeck
" Latest Revision: 19 March 2013

if exists("b:current_syntax")
  finish
endif

" Keywords
syn keyword paramKeywords client name type
syn keyword basicKeywords statemachine ActionClient actionstate


let b:current_syntax = "smach_model"
hi def link basicKeywords Statement
hi def link paramKeywords Type