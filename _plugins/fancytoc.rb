module Jekyll
  module FancyToCFilter
    def fancytoc(input)
      converter = Redcarpet::Markdown.new(Redcarpet::Render::WITH_TOC_DATA)
      toc = converter.render(input)
      tocpre = '<div class="toc">'
      tocpost = '</div>'
      tocpre + toc + tocpost unless toc.empty?
    end
  end
end

Liquid::Template.register_filter(Jekyll::FancyToCFilter)
