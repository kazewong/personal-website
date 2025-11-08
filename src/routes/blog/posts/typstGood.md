---
title: 'Use Typst now'
date: '2024-11-22'
tags: [ 'Writing', 'Tool']
shortDescription: 'Stop using LaTeX'
---

# I can't go back to `LaTeX` now

I learned about `typst` earlier this year, probably sometime around Feburary or March.
Originally I couldn't find much use case for it since most of my collaborators are still using `LaTeX`, and I spend most of my time writing codes instead of documents.
Then I got my new job as a faculty, which means I will need to spend hours in writing up non-code materials like lecture notes and grant proposals, and that is exactly what I did for the last three months.
While I know I cannot use `typst` for paper submission since they need the source files, but proposals and lecture notes? These two only require the pdfs, so I decided to give `typst` a try, and boy I don't regret it one bit. Tho what exactly makes `typst` superior

# Simpler syntax and file trees

`LaTeX` is all about anti-simplicity. After compilation you have half a dozen of files; If you want to see the changes in the reference you may have to do `pdflatex` and `bibtex` a couple of times; There are all these crazy backslash you have to put everywhere, etc. It's just a pain to write `LaTeX` to be honest. For `typst`, the experience for me is much much simpler, it is similar to markdown but much more powerful. Thanks to `typst`, I can concentrate on writing instead of getting my chain of thoughts broken by a random macro error. The simple syntax doesn't mean it is anything less powerful. In fact you can easily write some very complicated functions in `typst` and programmatically generate the answer within `typst`. For example, you can write conditions like:

```typst
#if shown [
    show this
]
else [
    hide this
]
```

Now you can have two versions of the pdf with a single toggle, and this is a great to have if you want to make a version of your lecture notes that hide the answer before the students complete the task. If you are interested in learning more about `typst` scripting capability, definitely check out their script guide.

# Fast compilation

If you ever push the compile button on Overleaf or do `pdflatex` locally, you may at least need to wait for a couple of seconds to see the results. It's not the end of the world, but as a person who cares about speed a lot, these couple of seconds are the seconds I will never get back in my life. And if you are wrestling with the formatting of the document, it's very likely that you need to keep recompiling the document. Then these couple of seocnds add up to minutes, hours. That's just sad.

With `typst`, the compilation is essentially instant. If you look at their web service, you will find more similiarity between Google Doc and their online editor instead of Overleaf, despite `typst` is a typesetting system. If you are using VSCode, you can install an extension that will let instant see all the changes in the compiled pdf whenever you make changes in the source. If I recall correctly, this has to do with `typst` only recomile the part that needs to be compile, instead of recompiling everything like `LaTeX`. Plus `typst` is written in `rust`, which makes it even cooler.

# Maybe not journal yet?

The main reason why a lot of the jounrals will probably not accept `typst` yet is partly because `typst` hasn't reached 1.0.0 yet, meaning things could change drastically, and from the journal standpoint I can understand why they may not want to accept it yet. There is also the formatting issues. Journals have standardized the way they want their publication to look like, until some hero create the corresponding style file in the journal, journals are unlikely to make the move themselves. Finally, this is also part sociallogical. Not that many people know about `typst` and make the shift yet, so there is no critical mass to support the infrastructure and adoption. That's why you should start using `typst` today! It's good for you and good for the community!
