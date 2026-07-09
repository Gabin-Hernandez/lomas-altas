import Image from "next/image";

export default function TestLogos() {
  return (
    <div className="bg-[#153124] p-10 min-h-screen text-white flex flex-col gap-10">
      <div>
        <h1 className="text-xl mb-2">logo1.svg:</h1>
        <Image src="/images/logo1.svg" alt="logo1" width={300} height={100} className="bg-white/10 p-2" />
      </div>
      <div>
        <h1 className="text-xl mb-2">logo2.svg:</h1>
        <Image src="/images/logo2.svg" alt="logo2" width={300} height={100} className="bg-white/10 p-2" />
      </div>
      <div>
        <h1 className="text-xl mb-2">logo3.svg:</h1>
        <Image src="/images/logo3.svg" alt="logo3" width={300} height={100} className="bg-white/10 p-2" />
      </div>
      <div>
        <h1 className="text-xl mb-2">logo4.svg:</h1>
        <Image src="/images/logo4.svg" alt="logo4" width={300} height={100} className="bg-white/10 p-2" />
      </div>
      <div>
        <h1 className="text-xl mb-2">logo5.svg:</h1>
        <Image src="/images/logo5.svg" alt="logo5" width={300} height={100} className="bg-white/10 p-2" />
      </div>
    </div>
  );
}
