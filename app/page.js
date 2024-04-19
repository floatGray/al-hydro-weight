import ReadFileContent from '@/components/readFile';

export default function Home() {
  const xyzFileContent = ReadFileContent('a.xyz');
  const jsonFileContent = ReadFileContent('b.json');
  return (
    <div>
      <h1 className="mb-8">读取文件</h1>
      <p className="border-4 border-fuchsia-950">{xyzFileContent}</p>
      <p>{jsonFileContent}</p>
    </div>
  );
}
