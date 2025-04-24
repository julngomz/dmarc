interface ErrorProps {
  code: string,
  message: string,
}

const Error: React.FC<ErrorProps> = ({
  code,
  message,
}: ErrorProps) => {
  return (
    <div className="container mx-auto w-full h-full bg-gray-400">
      <div className="flex flex-col">
        <p className="text-md">
          <span>{code}</span><span>{message}</span>
        </p>
      </div>
    </div>
  )
}

export default Error
