require 'sinatra'
require 'json'

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/status' do
  text = if params[:text]
           { text: params[:text] }
         else
           JSON.parse(request.body.read)
         end

  content_type :json
  text.to_json
end
