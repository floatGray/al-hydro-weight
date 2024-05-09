'use client';
import React, { useEffect, useState } from 'react';
import MoleculeViewer from '@/components/MoleculeViewer';
import Header from '@/components/Header';
import { DownloadButton } from '@/components/DownloadButton';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function ResultPage() {
  const [jsonFileContent, setJsonFileContent] = useState({});
  const [formular, setFormular] = useState('');
  const [xyzData, setXyzData] = useState()



  useEffect(() => {

    let existingID = localStorage.getItem('genId');

    fetch('/api/readFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ existingID, fileName: `${existingID}_AIhydroWeightFinalMetrics.json` }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setJsonFileContent(JSON.parse(data.fileContent));
        setFormular(JSON.parse(data.fileContent).formular.replace(/([A-Z][a-z]*)(\d+)/g, (match, p1, p2) => `${p1}_{${p2}}`))
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetch('/api/readFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ existingID, fileName: `${existingID}_AIhydroWeightFinal.xyz` }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setXyzData(data.fileContent);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[450px]">
        <MoleculeViewer xyzData={xyzData} />
      </div>
      <div
        className="flex justify-center"
        style={{ width: '70%', margin: '0 auto' }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>wr2</TableHead>
              <TableHead>r1</TableHead>
              <TableHead>goof</TableHead>
              <TableHead>q1</TableHead>
              <TableHead>structure_mes</TableHead>
              <TableHead>quality_mes</TableHead>
              <TableHead>Formula</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{jsonFileContent.wr2}</TableCell>
              <TableCell>{jsonFileContent.r1}</TableCell>
              <TableCell>{jsonFileContent.goof}</TableCell>
              <TableCell>{jsonFileContent.q1}</TableCell>
              <TableCell>{jsonFileContent.structure_mes}</TableCell>
              <TableCell>{jsonFileContent.quality_mes}</TableCell>
              <TableCell>
                <InlineMath math={formular} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <DownloadButton />
      </div>
    </>
  );
}

export default ResultPage;
