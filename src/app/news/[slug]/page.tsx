          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => {
              const isList = paragraph.startsWith('•') || paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.') || paragraph.startsWith('6.') || paragraph.startsWith('7.') || paragraph.startsWith('8.') || paragraph.startsWith('9.');

              // Insert Smartlink ad after the first paragraph
              if (index === 1) {
                return (
                  <div key={`ad-${index}`} className="my-8">
                    <div className="max-w-2xl mx-auto">
                      <AdPlacement position={`article-${article.id}-smartlink`} type="smartlink" />
                    </div>
                    <p key={index} className={index === 0 ? "text-xl text-muted-foreground mb-6 leading-relaxed" : "mb-4"}>
                      {paragraph}
                    </p>
                  </div>
                );
              }

              return isList ? (
                renderList(paragraph, index)
              ) : (
                <p key={index} className={index === 0 ? "text-xl text-muted-foreground mb-6 leading-relaxed" : "mb-4"}>
                  {paragraph}
                </p>
              );
            })}
          </div>