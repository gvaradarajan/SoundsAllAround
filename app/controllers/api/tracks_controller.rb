class Api::TracksController < ApplicationController

  def index
    @tracks = Track.order(created_at: :desc)
  end

  def show
    @track = Track.includes(artist: :uploaded_tracks)
                  .includes(playlists: :tracks)
                  .find(params[:id])
  end

  def create
    @track = Track.new(track_params)
    
    `ffmpeg -i #{track_params['audio'].path} -ac 1 -filter:a aresample=8000 -map 0:a -c:a pcm_s16le -f data - > temp.txt`

    contents = IO.binread("temp.txt").unpack('s*')

    arr = []

    amps = []

    contents.each_index do |i|
      if i % 2 == 0
        if contents[i] && contents[i+1]
          arr.push((contents[i] - contents[i+1]).abs)
        end
      end
    end

    segsize = arr.length / 140

    (0...140).each do |i|
      j = i * segsize
      total = 0
      while j < ((i+1) * segsize)
        total += arr[j]
        j += 1
      end
      amps.push(total / segsize)
    end

    @track.amplitudes = amps

    `rm temp.txt`

    if @track.save
      render :show
    else
      render @track.errors.full_messages, status: 422
    end
  end

  def update
  end

  def destroy
  end

  private

  def track_params
    params.require(:track).permit(:title, :artist_id, :audio, :image)
  end

end
