class ApplicationController < ActionController::Base
  def index
    @covers = Dir.glob("app/assets/images/covers/*").shuffle.map do |f| File.basename f end
    @tracklist = File.read("app/assets/tracklist/tracklist.html")
    gon.tracklist = @tracklist
  end
end
