module Jekyll
  class ViewVideoTag < Liquid::Tag

    def initialize(tag_name, video_path, tokens)
      super
      @video_path = video_path
    end

    def render(context)
      @context = context
      site = context.registers[:site]
      video_url = compute_relative_url("/assets/videos/#{@video_path}")

      <<-STRING
        <a class="view-video" href="#{video_url}" onclick="return viewVideo(event);">🎥
          <span style="display:none">
            <video controls autoplay="false" preload="true">
              <source src="#{video_url}" type="video/mp4">
            </video>
          </span>
        </a>
      STRING
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

Liquid::Template.register_tag('view_video', Jekyll::ViewVideoTag)