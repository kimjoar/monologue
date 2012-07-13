require 'sinatra'
require 'json'

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/app.js' do
  content_type 'application/javascript'
  File.read(step(params[:step] || ""))
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
    step = match[1]
  end

  return step_file unless step
  return step_file unless File.exists?(step_file(step))

  step_file step
end

def step_file(step = 1)
  File.join('public', "step#{step}.js")
end

