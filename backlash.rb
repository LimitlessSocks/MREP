$HUES = %w(Ruby Topaz Lemon Malachite Sapphire Ebony Over-Ebony)
$PITCHES = %w(Double-Flat Flat Natural Sharp Double-Sharp)
$WEAVE = %w(Sparse Loose Tight Locked)
$LAW_FACTOR = 7.0/12.0


class Working
    attr_reader :caspers, :hue, :pitch, :weave
    
    def initialize(caspers, hue, pitch, weave)
        @caspers = caspers.to_f
        @hue = hue
        @pitch = pitch
        @weave = weave
        # @hue = $HUES.find_index hue
        # @pitch = $PITCHES.find_index pitch
        # @weave = $WEAVE.find_index weave
    end
    
    def backlash
        new_capsers = @caspers * $LAW_FACTOR
        
        new_hue = @hue
        if @hue != "Over-Ebony"
            hue_index = $HUES.find_index @hue
            new_hue_index = ($HUES.size - 2) - hue_index
            new_hue = $HUES[new_hue_index]
        end
        
        pitch_index = $PITCHES.find_index @pitch
        new_pitch_index = ($PITCHES.size - 1) - pitch_index
        new_pitch = $PITCHES[new_pitch_index]
        
        new_weave = @weave
        
        Working.new new_capsers, new_hue, new_pitch, new_weave
    end
    
    def to_s
        "#{@caspers}, #{@hue}, #{@pitch}, #{@weave}"
    end
end

$BACKGROUND = 100

example = Working.new 3000, "Ebony", "Sharp", "Tight"

until example.caspers <= $BACKGROUND
    puts example
    example = example.backlash
end