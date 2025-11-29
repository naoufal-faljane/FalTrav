'use client';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Download } from 'lucide-react';
import { usePageViewTracker } from '@/lib/analytics';

export default function PressPage() {
  usePageViewTracker();

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Press Center</h1>
          <p className="text-lg text-muted-foreground mb-8">Resources for journalists and media professionals</p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Press Kit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Download our press kit for official company information, logos, and brand assets.</p>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Press Kit
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Founded in 2025, FalTrav is dedicated to revolutionizing the travel experience through innovative technology 
                and personalized service. Our mission is to make travel accessible, enjoyable, and memorable for everyone.
              </p>
              <p>
                For press inquiries, marketing collaborations, or media partnerships, our team is ready to assist you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Press Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Reach out to our press team for media inquiries, interviews, or press materials.</p>
              <Button asChild>
                <a href="mailto:faltrav25@gmail.com?subject=Press Inquiry&body=I am a member of the press interested in learning more about your company.">
                  <Mail className="h-4 w-4 mr-2" />
                  Press Contact: faltrav25@gmail.com
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}