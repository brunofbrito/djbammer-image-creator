class WelcomeController < ApplicationController

  def index
    @covers = Dir.glob("app/assets/images/covers/*").shuffle.map do |f| File.basename f end
  end

end