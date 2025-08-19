import { ProgressCircle } from "@chakra-ui/react"

const LoadingCircle=()=>{
    return(
        <ProgressCircle.Root value={null} size="md" colorPalette={'red'}>
            <ProgressCircle.Circle css={{'--thickness': '3px'}} > 
                <ProgressCircle.Track />
                <ProgressCircle.Range  />
            </ProgressCircle.Circle>
        </ProgressCircle.Root>
    )
}

export default LoadingCircle;