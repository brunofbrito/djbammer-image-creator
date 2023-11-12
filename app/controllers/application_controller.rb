class ApplicationController < ActionController::Base
  def index
    @covers = Dir.glob("app/assets/images/covers/*").shuffle.map do |f| File.basename f end

    @tracklist = Dir.glob("app/assets/tracklist/*.html").first
    tracklist_directory = "app/assets/tracklist/"
    html_files = Dir.glob(File.join(tracklist_directory, "*.html"))

    if html_files.any?
      @tracklist = File.read(html_files.first)
    else
      # Handle the case where no HTML files are found
      @tracklist = "No HTML files found in the directory."
    end
    
    gon.tracklist = @tracklist
  end
end
