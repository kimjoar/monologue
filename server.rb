require 'sinatra'
require 'json'

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/statuses' do
  content_type :json
  { text: params[:text] }.to_json
end
