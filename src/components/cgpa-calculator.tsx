
"use client";

import { useState } from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from './ui/separator';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

type Semester = {
  id: number;
  sgpa: string;
};

export function CgpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
      { id: 1, sgpa: '' },
      { id: 2, sgpa: '' },
  ]);
  const [result, setResult] = useState<{ cgpa: number; percentage: number } | null>(null);

  const handleSemesterChange = (id: number, value: string) => {
    setSemesters(semesters.map(sem => sem.id === id ? { ...sem, sgpa: value } : sem));
    setResult(null); // Reset result on change
  };

  const addSemester = () => {
    if (semesters.length < 8) {
      setSemesters([...semesters, { id: Date.now(), sgpa: '' }]);
    }
  };

  const removeSemester = (id: number) => {
    setSemesters(semesters.filter(sem => sem.id !== id));
    setResult(null);
  };

  const calculateCgpa = () => {
    const validSgpas = semesters
        .map(sem => parseFloat(sem.sgpa))
        .filter(sgpa => !isNaN(sgpa) && sgpa >= 0 && sgpa <= 10);
    
    if (validSgpas.length > 0) {
        const totalSgpa = validSgpas.reduce((sum, sgpa) => sum + sgpa, 0);
        const cgpa = parseFloat((totalSgpa / validSgpas.length).toFixed(2));
        const percentage = (cgpa - 0.75) * 10;
        setResult({ cgpa, percentage });
    } else {
      setResult(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">CGPA Calculator</CardTitle>
        <CardDescription>
          Enter the SGPA for each semester to calculate your Cumulative Grade Point Average.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-10 gap-4 font-medium text-muted-foreground text-sm">
            <Label className="col-span-8">Semester SGPA</Label>
          </div>
          {semesters.map((semester, index) => (
            <div key={semester.id} className="grid grid-cols-10 gap-4 items-center">
              <Input
                type="number"
                placeholder={`Sem ${index + 1} SGPA`}
                value={semester.sgpa}
                onChange={(e) => handleSemesterChange(semester.id, e.target.value)}
                className="col-span-8"
                min="0"
                max="10"
                step="0.01"
              />
              <div className="col-span-2 flex justify-end">
                {semesters.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removeSemester(semester.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                    <span className="sr-only">Remove Semester</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
           {semesters.length < 8 && (
            <Button variant="outline" onClick={addSemester} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Semester
            </Button>
           )}
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center gap-4">
          <Button onClick={calculateCgpa} size="lg" variant="default" disabled={semesters.length === 0}>Calculate CGPA</Button>
          {result !== null && (
            <div className="text-center p-4 bg-primary/10 rounded-lg w-full mt-4">
               <div className="grid grid-cols-2 items-center divide-x-2 divide-primary/20">
                    <div className="flex flex-col px-2">
                         <p className="text-lg text-primary/80">Your CGPA</p>
                         <p className="text-5xl font-bold text-primary">{result.cgpa.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col px-2">
                        <p className="text-lg text-primary/80">Percentage</p>
                        <p className="text-5xl font-bold text-primary">{result.percentage.toFixed(2)}%</p>
                    </div>
               </div>
            </div>
          )}
        </div>
        <Alert className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Notes</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>This calculator is for estimation purposes and is based on the data you provide. Always verify with official VTU sources.</li>
                    <li>Enter the SGPA for each semester you have completed.</li>
                    <li>The CGPA is calculated as the simple average of all the SGPA values you provide.</li>
                    <li>The percentage is calculated using the formula: `(CGPA - 0.75) * 10`.</li>
                </ul>
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
