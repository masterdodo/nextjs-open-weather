import Spinner from '../public/images/loading.gif'

export default function Loading() {
    return (
        <div>
            <Image className="w-[200px] m-auto block" src={Spinner} alt="Loading ..." />
        </div>
    )
}