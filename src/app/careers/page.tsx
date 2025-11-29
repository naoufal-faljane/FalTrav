'use client';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { usePageViewTracker } from '@/lib/analytics';

export default function CareersPage() {
  usePageViewTracker();

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Join Our Team</h1>
          <p className="text-lg text-muted-foreground mb-8">Come build amazing travel experiences with us</p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Why Work With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                <li>Remote-friendly work environment</li>
                <li>Opportunity to impact global travel experiences</li>
                <li>Competitive benefits and growth opportunities</li>
                <li>Creative and collaborative culture</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Openings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold">Travel Experience Designer</h3>
                  <p className="text-muted-foreground">Design memorable travel experiences for our customers</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-semibold">Frontend Developer</h3>
                  <p className="text-muted-foreground">Help build beautiful, responsive travel interfaces</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-semibold">Travel Content Writer</h3>
                  <p className="text-muted-foreground">Create engaging travel guides and content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Interested in joining our team? Send us your resume and cover letter.</p>
              <p className="mb-4">Interested in joining our team? Send us your resume and cover letter.</p>
              <Button asChild>
                <a href="mailto:faltrav25@gmail.com?subject=Job Application&body=I am interested in applying for a position at your company. Please find my resume and cover letter attached.">
                  <Mail className="h-4 w-4 mr-2" />
                  Email: faltrav25@gmail.com
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}