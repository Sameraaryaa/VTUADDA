
"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SgpaSubject } from '@/lib/types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Separator } from './ui/separator';
import { AlertCircle, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { sgpaCalculatorData } from '@/data/sgpa-calculator-data';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

// Extend jsPDF with autoTable
interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => jsPDF;
}

const gradingData = [
    { grade: 'O', level: 'Outstanding', points: 10, marks: '90-100' },
    { grade: 'A+', level: 'Excellent', points: 9, marks: '80-89' },
    { grade: 'A', level: 'Very Good', points: 8, marks: '70-79' },
    { grade: 'B+', level: 'Good', points: 7, marks: '60-69' },
    { grade: 'B', level: 'Above Average', points: 6, marks: '55-59' },
    { grade: 'C', level: 'Average', points: 5, marks: '50-54' },
    { grade: 'P', level: 'Pass', points: 4, marks: '40-49' },
    { grade: 'F', level: 'Fail', points: 0, marks: '0-39' },
];

export function SgpaCalculator() {
  const [selectedScheme, setSelectedScheme] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  
  const [studentName, setStudentName] = useState('');
  const [studentUsn, setStudentUsn] = useState('');

  const [subjectMarks, setSubjectMarks] = useState<Record<string, string>>({});

  const [result, setResult] = useState<{ sgpa: number; percentage: number; tableData: any[] } | null>(null);
  const [highlightDownload, setHighlightDownload] = useState(false);
  const reportCardRef = useRef<HTMLDivElement>(null);


  const schemes = Object.keys(sgpaCalculatorData);
  const branches = selectedScheme ? Object.keys(sgpaCalculatorData[selectedScheme]) : [];
  const semesters = (selectedScheme && selectedBranch) ? Object.keys(sgpaCalculatorData[selectedScheme][selectedBranch]) : [];
  
  const currentSubjects = useMemo(() => {
    if (selectedScheme && selectedBranch && selectedSemester) {
      return sgpaCalculatorData[selectedScheme]?.[selectedBranch]?.[selectedSemester] || [];
    }
    return [];
  }, [selectedScheme, selectedBranch, selectedSemester]);
  
  useEffect(() => {
    if (result && reportCardRef.current) {
        reportCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightDownload(true);
        const timer = setTimeout(() => setHighlightDownload(false), 3000); // Highlight for 3 seconds
        return () => clearTimeout(timer);
    }
  }, [result]);

  const getGradePoint = (marks: number, maxMarks: number = 100) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 10;
    if (percentage >= 80) return 9;
    if (percentage >= 70) return 8;
    if (percentage >= 60) return 7;
    if (percentage >= 55) return 6;
    if (percentage >= 50) return 5;
    if (percentage >= 40) return 4;
    return 0;
  };

  const getGradeLetter = (marks: number, maxMarks: number = 100) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 'O';
    if (percentage >= 80) return 'A+';
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'B+';
    if (percentage >= 55) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'P';
    return 'F';
  }
  
  const handleSchemeChange = (schemeName: string) => {
    setSelectedScheme(schemeName);
    setSelectedBranch('');
    setSelectedSemester('');
    setSubjectMarks({});
    setResult(null);
  }

  const handleBranchChange = (branchName: string) => {
    setSelectedBranch(branchName);
    setSelectedSemester('');
    setSubjectMarks({});
    setResult(null);
  }

  const handleSemesterChange = (semesterName: string) => {
    setSelectedSemester(semesterName);
    setSubjectMarks({});
    setResult(null);
  }

  const handleCalculate = () => {
    let totalCredits = 0;
    let weightedSum = 0;
    const tableData: any[] = [];

    currentSubjects.forEach(subject => {
        const marksStr = subjectMarks[subject.code];
        const credits = subject.credits;

        if (marksStr !== undefined && marksStr !== '' && !isNaN(credits) && credits > 0) {
            const marks = parseInt(marksStr, 10);
            if (!isNaN(marks) && marks >= 0 && marks <= 100) {
                 const gradePoint = getGradePoint(marks);
                 totalCredits += credits;
                 weightedSum += credits * gradePoint;
                 tableData.push({
                    code: subject.code,
                    name: subject.name,
                    credits: credits,
                    marks,
                    grade: getGradeLetter(marks),
                    gradePoint
                 });
            }
        }
    });

    if (totalCredits > 0) {
      const sgpa = parseFloat((weightedSum / totalCredits).toFixed(2));
      const percentage = (sgpa - 0.75) * 10;
      setResult({ sgpa, percentage, tableData });
    } else {
      setResult(null);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const doc = new jsPDF() as jsPDFWithAutoTable;

    doc.setFontSize(22);
    doc.text("VTU SGPA Result", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Name: ${studentName || 'N/A'}`, 14, 40);
    doc.text(`USN: ${studentUsn.toUpperCase() || 'N/A'}`, 14, 48);

    doc.autoTable({
        startY: 60,
        head: [['Subject', 'Credits', 'Marks', 'Grade']],
        body: result.tableData.map(row => [row.name, row.credits, row.marks, row.grade]),
        headStyles: {
            fillColor: [98, 0, 237]
        },
        theme: 'grid'
    });

    const finalY = doc.autoTable.previous.finalY;

    doc.setFontSize(16);
    doc.text("Final Result", 14, finalY + 20);
    doc.setFontSize(12);
    doc.text(`SGPA: ${result.sgpa.toFixed(2)}`, 14, finalY + 30);
    doc.text(`Percentage: ${result.percentage.toFixed(2)}%`, 14, finalY + 38);

    doc.save(`SGPA_Report_${studentUsn || 'vtuadda'}.pdf`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">SGPA Calculator</CardTitle>
        <CardDescription>
          Select your scheme, branch, and semester to calculate your SGPA.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedScheme} onValueChange={handleSchemeChange}>
                <SelectTrigger><SelectValue placeholder="Select Scheme" /></SelectTrigger>
                <SelectContent>
                    {schemes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={selectedBranch} onValueChange={handleBranchChange} disabled={!selectedScheme}>
                <SelectTrigger><SelectValue placeholder="Select Branch" /></SelectTrigger>
                <SelectContent>
                    {Object.keys(sgpaCalculatorData[selectedScheme] || {}).map((branch) => <SelectItem key={branch} value={branch}>{branch}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={selectedSemester} onValueChange={handleSemesterChange} disabled={!selectedBranch}>
                <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                <SelectContent>
                    {semesters.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        
        {currentSubjects.length > 0 && (
            <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="student_name">Your Name</Label>
                        <Input id="student_name" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Enter your name" />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="usn">Your USN</Label>
                        <Input id="usn" value={studentUsn} onChange={e => setStudentUsn(e.target.value)} placeholder="Enter your USN" />
                    </div>
                </div>

                <Separator />
                
                 <div className="grid grid-cols-10 gap-4 font-medium text-muted-foreground text-sm">
                    <Label className="col-span-8">Subjects</Label>
                    <Label className="col-span-2 text-center">Marks (out of 100)</Label>
                </div>
                 {currentSubjects.map(subject => (
                    <div key={subject.code} className="grid grid-cols-10 gap-4 items-center">
                        <div className="col-span-8">
                            <Label htmlFor={`marks_${subject.code}`} className="font-normal">{subject.name} ({subject.code})</Label>
                            <span className="text-xs text-muted-foreground ml-2">({subject.credits} Credits)</span>
                        </div>
                        <Input
                            id={`marks_${subject.code}`}
                            type="number"
                            placeholder="Marks"
                            value={subjectMarks[subject.code] || ''}
                            onChange={e => setSubjectMarks({...subjectMarks, [subject.code]: e.target.value})}
                            className="col-span-2"
                            min="0"
                            max="100"
                        />
                    </div>
                ))}
            </div>
        )}
        
        <Separator className="my-6"/>

        <div className="flex flex-col items-center gap-4">
          <Button onClick={handleCalculate} size="lg" disabled={currentSubjects.length === 0}>Calculate SGPA</Button>
          {result && (
              <>
                <div id="report-card" ref={reportCardRef} className="p-6 bg-background rounded-lg border w-full scroll-mt-20">
                     <h3 className="text-xl font-bold text-center mb-4 text-gradient">Temporary Grade Card</h3>
                      <div className="text-center mb-4">
                        <p><strong>Name:</strong> {studentName || 'N/A'}</p>
                        <p><strong>USN:</strong> {studentUsn.toUpperCase() || 'N/A'}</p>
                      </div>
                     <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                        <div className="p-4 bg-primary/10 rounded-lg">
                             <p className="text-lg text-primary/80">Your SGPA</p>
                             <p className="text-5xl font-bold text-primary">{result.sgpa.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-lg text-primary/80">Percentage</p>
                            <p className="text-5xl font-bold text-primary">{result.percentage.toFixed(2)}%</p>
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-left">Subject</th>
                                    <th className="p-2 text-center">Credits</th>
                                    <th className="p-2 text-center">Marks</th>
                                    <th className="p-2 text-center">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.tableData.map(row => (
                                    <tr key={row.code} className="border-b">
                                        <td className="p-2">{row.name} ({row.code})</td>
                                        <td className="p-2 text-center">{row.credits}</td>
                                        <td className="p-2 text-center">{row.marks}</td>
                                        <td className="p-2 text-center font-bold">{row.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
                <Button 
                    onClick={handleDownload} 
                    variant="outline" 
                    className={cn(
                        "w-full transition-all duration-300",
                        highlightDownload && "ring-2 ring-primary ring-offset-2 animate-pulse"
                    )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Report as PDF
                </Button>
              </>
          )}
        </div>
        <Alert className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Notes</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>This calculator is for estimation purposes and is based on the data you provide. Always verify with official VTU sources.</li>
                    <li>Enter marks out of 100. Grade points are assigned based on standard VTU regulations.</li>
                    <li>Subjects with 0 credits are not included in the SGPA calculation.</li>
                    <li>The percentage is calculated using the formula: `(SGPA - 0.75) * 10`.</li>
                </ul>
            </AlertDescription>
        </Alert>

        <div className="pt-8">
             <Card>
                <CardHeader>
                    <CardTitle>VTU Grading System</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Letter Grade</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead className="text-center">Grade Point</TableHead>
                                <TableHead className="text-center">Marks Range (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gradingData.map((row) => (
                                <TableRow key={row.grade}>
                                    <TableCell className="font-medium text-center">{row.grade}</TableCell>
                                    <TableCell>{row.level}</TableCell>
                                    <TableCell className="text-center">{row.points}</TableCell>
                                    <TableCell className="text-center">{row.marks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </CardContent>
    </Card>
  );
}
