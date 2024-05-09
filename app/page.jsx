import FileUploader from '@/components/FileUploader';
import InfoForm from '@/components/InfoForm';
import Header from '@/components/Header';
async function Home() {

  return (
    <>
      <Header />

      <div className=" divide-y divide-gray-900/10 bg-gray-50 h-screen">

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3 px-12  w-3/4 mx-auto">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Instructions:</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">1. The diffraction data file .hkl and the initial .ins file (generated from a .p4p file) are required as inputs. Accurate elemental composition is not necessary; you can set a broad elemental composition in the SFAC command of the .ins file.</p>
            <p className="mt-1 text-sm leading-6 text-gray-600">2. We calculate the R1, WR2, GOOF, and the maximum residual electron density peak Q1 of the results using SHELXL. CheckCIF is used to check the structural validity and quality of the diffraction data. Detailed analysis results are packaged in a compressed file, which you can download directly.</p>
            <p className="mt-1 text-sm leading-6 text-gray-600">3. For any issues, please contact <a href='mailto:kaipengm2@gmail.com'>kaipengm2@gmail.com</a>. Thank you for using our service!</p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 h-min">
            <InfoForm />
            <FileUploader />

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
