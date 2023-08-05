module Jekyll
  class ViewImageTag < Liquid::Tag

    def initialize(tag_name, image_path, tokens)
      super
      @image_path = image_path
    end

    def render(context)
      @context = context
      site = context.registers[:site]
      relative_path = Liquid::Template.parse(@relative_path).render(context)
      image_url = "#{relative_path}/assets/images/#{@image_path}"
      "<a class='view-image' href='#{image_url}' onclick='return viewImage(event);'>📷</a>"
    end
  end
end

Liquid::Template.register_tag('view_image', Jekyll::ViewImageTag)