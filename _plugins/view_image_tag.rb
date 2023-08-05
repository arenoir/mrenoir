module Jekyll
  class ViewImageTag < Liquid::Tag

    def initialize(tag_name, image_path, tokens)
      super
      @image_path = image_path
    end

    def render(context)
      @context = context
      site = context.registers[:site]
      image_url = compute_relative_url("/assets/images/#{@image_path}")
      "<a class='view-image' href='#{image_url}' onclick='return viewImage(event);'>📷</a>"
    end

    private

    def compute_relative_url(input)
      return input if Addressable::URI.parse(input.to_s).absolute?

      parts = [sanitized_baseurl, input]
      Addressable::URI.parse(
        parts.map! { |part| ensure_leading_slash(part.to_s) }.join
      ).normalize.to_s
    end

    def sanitized_baseurl
      site = @context.registers[:site]
      baseurl = site.config["baseurl"]
      return "" if baseurl.nil?

      baseurl.to_s.chomp("/")
    end

    def ensure_leading_slash(input)
      return input if input.nil? || input.empty? || input.start_with?("/")

      "/#{input}"
    end
  end
end

Liquid::Template.register_tag('view_image', Jekyll::ViewImageTag)