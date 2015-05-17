module Jekyll
  def initialize(config)
          require 'redcarpet'
          @config = config
          @redcarpet_extensions = {}
          @config['redcarpet']['extensions'].each { |e| @redcarpet_extensions[e.to_sym] = true }

          @renderer ||= if @confimodule Jekyll
  def initialize(config)
          require 'redcarpet'
          @config = config
          @redcarpet_extensions = {}
          @config['redcarpet']['extensions'].each { |e| @redcarpet_extensions[e.to_sym] = true }

          @renderer ||= if @config['pygments']
                          Class.new(Redcarpet::Render::HTML) do
                            include WithPygments
                          end
                        else
                          Class.new(Redcarpet::Render::HTML) do
                            include WithoutPygments
                          end
                        end
        rescue LoadError
          STDERR.puts 'You are missing a library required for Markdown. Please run:'
          STDERR.puts '  $ [sudo] gem install redcarpet'
          raise FatalException.new("Missing dependency: redcarpet")
        end
  module ToC
  # module Converters
  #   class Markdown
  #     class RedcarpetParser
          def convert(input)
            html_toc = Redcarpet::Markdown.new(Redcarpet::Render::HTML_TOC) if @redcarpet_extensions[:html_toc]
            
            toc = convert.render(content) if @redcarpet_extensions[:html_toc]
            
            toc
          end

          
        end
    
  #     end
  #   end
  # end
end

Liquid::Template.register_filter(Jekyll::ToC)g['pygments']
                          Class.new(Redcarpet::Render::HTML) do
                            include WithPygments
                          end
                        else
                          Class.new(Redcarpet::Render::HTML) do
                            include WithoutPygments
                          end
                        end
        rescue LoadError
          STDERR.puts 'You are missing a library required for Markdown. Please run:'
          STDERR.puts '  $ [sudo] gem install redcarpet'
          raise FatalException.new("Missing dependency: redcarpet")
        end
  module ToC
  # module Converters
  #   class Markdown
  #     class RedcarpetParser
          def convert(input)
            html_toc = Redcarpet::Markdown.new(Redcarpet::Render::HTML_TOC) if @redcarpet_extensions[:html_toc]
            
            toc = convert.render(content) if @redcarpet_extensions[:html_toc]
            
            toc
          end

          
        end
    
  #     end
  #   end
  # end
end

Liquid::Template.register_filter(Jekyll::ToC)
