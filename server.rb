require 'sinatra'
require 'json'

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/status' do
  data = if params[:text]
           params
         else
           JSON.parse(request.body.read)
         end

  content_type :json
  data.to_json
end
