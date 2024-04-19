import { Audio } from 'expo-av';

const AudioControls = () => {

    const getStatus = async (source)=> {
        if(source)
        {
            const trackStatus = await source.getStatusAsync()
            return trackStatus
        }
    }

    const setPosition= async (source, position) => {
        if(source)
        {
            await source.setPositionAsync(position)
        }
    }


    const handleAudioState = async (source, playState) => {
        if(playState)
        {
            await playAudio(source)
        }else {
            await pauseAudio(source)
        }
    }

    const playAudio = async (source) => {
        
        if(!source)
            return

        const status = await getStatus(source)
        
        // Recheck whether to handle if audio is not loaded.
        if(status?.isLoaded && !status.isPlaying)
        {
            await source.playAsync()
        }
    }

    const getSoundSource = async (sourceUrl, volume = 1 , options = {} ,shouldPlay=true) => {
        const {sound } = await Audio.Sound.createAsync({uri: sourceUrl, overrideFileExtensionAndroid: "mp3"}, {
            shouldPlay: shouldPlay,
            volume:volume,
            ...options
        })
        return sound
    }

    const getSoundSourceFromLocalSource = async (sourceUrl, volume = 1 , options = {} ,shouldPlay=true) => {
        const {sound } = await Audio.Sound.createAsync(sourceUrl, {
            shouldPlay: shouldPlay,
            volume:volume,
            ...options
        })
        return sound
    }
    const pauseAudio = async (source) => {
        const status = await getStatus(source)

        if(status.isPlaying)
        {
            console.log("Pausing")
            await source.pauseAsync()
        }
    }

    const setVolume = async (source, volumne) => {

        if(!source)
            return

        const status = await getStatus(source)

        if(status?.isLoaded)
        {
            if(volumne > 0 && volumne <= 1)
            {
                sourceStatus = await getStatus(source)
                currentVolume = sourceStatus.volumne
                if (currentVolume !== volumne)
                {
                    await source.setVolumeAsync(volumne)
                }
            }
        }
    }

    const unloadAudio = async (source) => {
        if (source)
            await source.unloadAsync()
    }

    return {
        unloadAudio,
        playAudio,
        getSoundSource,
        pauseAudio,
        setVolume,
        handleAudioState,
        getStatus,
        getSoundSourceFromLocalSource,
        setPosition
    };
}

export default AudioControls;