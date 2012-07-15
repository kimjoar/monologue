require 'sinatra'
require 'json'

helpers do
  include Rack::Utils
  alias_method :h, :escape
end

get '/' do
  @step = step(params[:step] || "")
  erb :index
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

def step(param)
  if (match = param.match(/\A([0-9]{1,2})\z/))
    match[1]
  else
    1
  end
end
